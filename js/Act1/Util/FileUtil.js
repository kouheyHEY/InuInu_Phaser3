class FileUtil {
    constructor() { }

    /**
     * ファイルマネージャからファイルを取得する
     */
    static getFileFromDialog() {
        return new Promise((resolve, reject) => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';

            fileInput.addEventListener('change', function (event) {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                    const fileName = selectedFile.name;
                    resolve(fileName);
                } else {
                    reject('ファイルが選択されていません。');
                }

                // ダイアログを削除
                document.body.removeChild(fileInput);
            });

            // ファイル選択ダイアログを表示
            fileInput.click();
        });
    }

    /**
     * ファイルをダイアログから取得して、ファイル名を取得する
     * @returns {string} ファイル名
     */
    static getFileName() {
        FileUtil.getFileFromDialog()
            .then((fileName) => {
                // ファイル名を変数に格納
                fileName;
                // ファイル名を使った処理をここに追加
                console.log('ファイル名:', fileName);
                return fileName;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}