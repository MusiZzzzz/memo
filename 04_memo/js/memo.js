"use strict";

document.addEventListener("DOMContentLoaded",

    function(){
    //1.localStorageの確認
    if(typeof localStorage === "undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();  // localStorageからのデータの取得機能
        saveLocalStorage(); // localStorageの保存機能
        selectTable();  //選択機能
        delLocalStorage();  //削除機能
        allClearStorage();  //すべて削除機能
    }
},false
);

// 2.localStorageの保存機能
    function saveLocalStorage(){  
    var save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key = document.getElementById("textKey").value;  // get key
        const value = document.getElementById("textMemo").value; //  get value
        if(key != "" && value != ""){    //key と value　内容がある場合 
            //処理の確認用窓口
            let SaveReally = confirm("LocalStorageのテーブルに\n" + key + " " + value + "を保存(save)します \nよろしいでしょうか");
            if(SaveReally === true){
                saveBtn(); //save機能の使用
            }
        }else{        
        var msg = "Key、Memoはいずれも必須です。";
        window.alert(msg);}
         },false
        );
    };

    //5.選択

    function selectTable(){
        const select = document.getElementById("select");
        select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckbox("select"); // selectRadioBtnの使用
        },false
        );
    }

    //6.削除

    function delLocalStorage(){
        const del = document.getElementById("del");
        del.addEventListener("click",
        function(e){    
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            //　行数を初期化処理
            let w_cnt = 0;
            // Checkboxから対応のmodeを選択
            w_cnt = selectCheckbox("del");
            //　行数が１以上
            if(w_cnt >= 1){
                let w_confirm = window.confirm("LocalSotrageから選択している" + w_cnt + "件を削除(delect)しますか?");
                // ユーザーが確定ボタンを押しての処理
                if(w_confirm === true){
                    for(let i = 0;i <= w_cnt;i++){
                        if(chkbox1[i].checked){
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                    }
                viewStorage(); // 値を一度表示すること
                let w_msg = "localStorageから" + w_cnt + "件を削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = ""; //labelをクリア
                document.getElementById("textMemo").value = ""; //labelをクリア
                     }
                 }
            },false
        );
    }

    // 7.すべて削除

    function allClearStorage(){
        const allClear = document.getElementById("allClear");
        allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            //処理の確認用窓口
            let w_confirm = confirm("LocalStorageのテーブルをすべて削除(all Clear)します \nよろしいでしょうか");
                if(w_confirm == true){
                //localStorageの削除指令を使用する
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除しました。";
                window.alert(w_msg);
                // label keyとvalueの初期化
                document.getElementById("textKey").value = ""; //labelをクリア
                document.getElementById("textMemo").value = ""; //labelをクリア
            }
        }
        )
    }
    //　選択機能
    function selectCheckbox(mode){
       // let w_sel = "0";
        let w_cnt = 0;
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_textKey = ""; // 変数を初期化
        let w_textMemo = ""; // 変数を初期化
                     for (let i = 0;i<chkbox1.length;i++){
                        if(chkbox1[i].checked){
                            if(w_cnt === 0){
                            w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                            w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                            //return w_sel = "1";
                            }
                            w_cnt++;
                        }
                     }
                     document.getElementById("textKey").value = w_textKey; //HtmlからtextKeyの値をw_textKeyという変数を代入する
                     document.getElementById("textMemo").value = w_textMemo;//HtmlからtextMemoの値をw_textKeyという変数を代入する

                     // modeがselectの場合の機能対応
                     if(mode === "select"){
                        if(w_cnt === 1){
                          return w_cnt; // w_cnt　を 1 として返し
                        }else{
                          window.alert("一つ選択(select)してください。"); //必ず一つを選択
                     }
                }
                    // modeがdelの場合の機能対応
                    if(mode === "del"){
                        if(w_cnt > 0){
                            return w_cnt;
                        }else{
                            window.alert("一つ選択(select)してください。") //　選択肢が1以上ではない場合の処理
                        }
                    }
                }

    // 保存機能
function saveBtn(){
    const key = document.getElementById("textKey").value;   //HtmlからtextKeyの値はkeyという変数を代入する
    const value = document.getElementById("textMemo").value;   //HtmlからtextMemoの値はValueという変数を代入する
    localStorage.setItem(key, value);   //localStorageからsetItemの機能を使用して、keyとvalueをlocalStorageに保存する
    viewStorage();
    let w_msg = "localStorageに" + key + " " + value + "を保存しました。";
    window.alert(w_msg);
    document.getElementById("textKey").value = ""; //labelをクリア
    document.getElementById("textMemo").value = ""; //labelをクリア
    }


    // localStorageからのデータの取得とテーブルへ表示
    function viewStorage(){
        const list = document.getElementById("list");

        //htmlのテーブル初期化
        while(list.rows[0]) list.deleteRow(0);

        //localStorageすべての情報の取得
        for(let i = 0;i<localStorage.length;i++){
        let w_key = localStorage.key(i);

        //localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML = "<input name ='chkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");
}