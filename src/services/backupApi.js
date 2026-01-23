const API_BASE_URL = 'http://localhost:8080/api';

export const backupApi = {
    // Inicia backup
    async startBackup(sources, destinations) {
        const response = await fetch(`${API_BASE_URL}/backup/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sources: sources.map(s => s.path),
                destination: destinations.map(d => d.path)
            })
        });

        if (!response.ok) {
            try {
                const error = await response.json();
                throw new Error(error.error || 'Failed to start backup');
            } catch {
                throw new Error('Failed to start backup');
            }
        }

        return response.json();
    },

    // Pausa backup
    async pauseBackup(taskId) {
        const response = await fetch(`${API_BASE_URL}/backup/${taskId}/pause`, {
            method: 'POST'
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to pause backup');
        }

        return response.text();
    },

    // Retoma backup
    async resumeBackup(taskId) {
        const response = await fetch(`${API_BASE_URL}/backup/${taskId}/resume`, {
            method: 'POST'
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to resume backup');
        }

        return response.text();
    },

    // Cancela backup
    async cancelBackup(taskId) {
        const response = await fetch(`${API_BASE_URL}/backup/${taskId}/cancel`, {
            method: 'POST'
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to cancel backup');
        }

        return response.text();
    },

    // Obter histórico
    async getHistory() {
        const response = await fetch(`${API_BASE_URL}/backup/history`);

        if (!response.ok) {
            throw new Error('Failed to fetch backup history');
        }

        const data = await response.json();

        // Transforma dados do Spring para formato do frontend
        return data.map((task, index) => ({
            id: index + 1,
            name: `Backup: ${task.sourcePath} → ${task.destinationPath}`,
            date: task.startedAt ? new Date(task.startedAt).toLocaleString() : 'N/A',
            size: task.totalSizeMB ? `${(task.totalSizeMB / 1024).toFixed(2)} GB` : '0 GB',
            status: this.mapStatus(task.status),
            files: task.fileCount || 0,
            duration: task.duration || '0m',
            source: task.sourcePath,
            destination: task.destinationPath,
            errorMessage: task.errorMessage
        }));
    },

    // Obter logs
    async getLogs() {
        const response = await fetch(`${API_BASE_URL}/logs/warnings`);

        if (response.status === 404) {
            return [];
        }

        if (!response.ok) {
            throw new Error('Failed to fetch logs');
        }

        const logText = await response.text();

        if (logText.includes('Nenhum alerta encontrado') || logText.includes('Nenhum backup foi executado')) {
            return [];
        }

        return this.parseLogs(logText);
    },

    // Obter status de uma tarefa
    async getTaskStatus(taskId) {
        const response = await fetch(`${API_BASE_URL}/backup/${taskId}/status`);

        if (!response.ok) {
            throw new Error('Failed to fetch task status');
        }

        return response.json();
    },

    // Mapear status
    mapStatus(backendStatus) {
        const statusMap = {
            'EM_ANDAMENTO': 'in_progress',
            'PAUSADO': 'paused',
            'CONCLUIDO': 'completed',
            'CANCELADO': 'cancelled',
            'FALHA': 'failed'
        };

        return statusMap[backendStatus] || 'unknown';
    },

    // Analisa logs
    parseLogs(logText) {
        if (!logText) return [];

        const lines = logText.split('\n').filter(line => line.trim());

        return lines.map((line, index) => {
            let level = 'warning';

            if (line.includes('ERROR') || line.includes('Erro')) {
                level = 'error';
            } else if (line.includes('INFO') || line.includes('Informação')) {
                level = 'info';
            } else if (line.includes('SUCCESS') || line.includes('Sucesso')) {
                level = 'success';
            }

            return {
                id: Date.now() + index,
                timestamp: new Date().toLocaleString(),
                level,
                message: line.trim(),
                source: 'backup-service'
            };
        });
    }
};

// SSE para progresso
export class BackupProgressStream {
    constructor() {
        this.eventSource = null;
        this.callbacks = new Map();
    }

    connect() {
        this.eventSource = new EventSource(`${API_BASE_URL}/backup/progress`);

        this.eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.notifyCallbacks('progress', data);
            } catch (error) {
                console.error('Failed to parse SSE data:', error);
            }
        };

        this.eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            this.notifyCallbacks('error', error);
        };

        return this;
    }

    on(event, callback) {
        this.callbacks.set(event, callback);
        return this;
    }

    notifyCallbacks(event, data) {
        const callback = this.callbacks.get(event);
        if (callback) {
            callback(data);
        }
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
        this.callbacks.clear();
    }
}