export type TerminalLine = {
    path: string; // コマンド実行時のカレントディレクトリ
    command: string;
    response: string | string[]; // 複数行のレスポンス（neofetch等）に対応するため配列も許容
    isError?: boolean;
};

class TerminalState {
    history = $state<string[]>([]); // ↑↓キーで呼び出す用の履歴を保持
    output = $state<TerminalLine[]>([]); // 画面に表示されるログを保持

    pushOutput(path: string, command: string, response: string | string[], isError = false) {
        this.output.push({ path, command, response, isError });
    }

    // history（入力履歴）の追加
    pushHistory(command: string) {
        if (command.trim() !== '') {
            this.history.push(command);
        }
    }

    // clearコマンド用
    clearOutput() {
        this.output = [];
    }
}

export const terminal = new TerminalState();