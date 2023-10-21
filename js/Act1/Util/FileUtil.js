class FileUtil {
    constructor() { }

    /**
     * ファイルマネージャからファイルを取得する
     */
    static getFileFromDialog() {
        return new Promise((resolve, reject) => {
            let fileInput = document.createElement('input');
            fileInput.type = 'file';
            document.getElementById(CONST_ACT1.INPUT_ID).appendChild(fileInput);

            fileInput.addEventListener('change', function (event) {
                let selectedFile = event.target.files[0];
                if (selectedFile) {
                    let fileName = selectedFile.name;
                    resolve(fileName);
                } else {
                    reject('ファイルが選択されていません。');
                }

                // ダイアログを削除
                document.getElementById(CONST_ACT1.INPUT_ID).removeChild(fileInput);
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

    /**
     * csvを配列に変換する（カンマ区切り）
     * @param {string} _filePath ファイルパス（相対）
     * @returns {Array} 配列
     */
    static loadCsvToArray(_filePath) {
        // csvの配列データ
        let csvData = [];

        fetch(_filePath)
            .then(response => response.text())
            .then(data => {
                // 1行ごとに処理
                let lines = data.split('\n');

                // カンマ区切りで配列に格納
                for (let i = 0; i < lines.length; i++) {
                    let row = lines[i].split(',');
                    csvData.push(row);
                }

                // ファイルの内容を処理するためのコードをここに追加
                console.log(csvData);
            })
            .catch(error => {
                console.error('ファイルの読み込みエラー:', error);
            });

        return csvData;
    }
}