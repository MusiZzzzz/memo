/**
 * 機能の説明書：
 * viewStorage -> localStorageからのデータの取得機能
 * ----------ボタン------------
 * saveLocalStorage -> 保存ボタン
 * selectTable -> 選択ボタン
 * delLocalStorage -> 削除ボタン
 * allClearStorage -> すべて削除ボタン
 * ----------機能--------------
 * saveBtn() -> 保存機能
 * delBtn() -> 削除機能
 * del_row() -> "trash"で削除機能
 * allClearBtn -> すべて削除機能
 * questionsound() -> 音声コントロール
 */
("use strict");

document.addEventListener(
  "DOMContentLoaded",

  function () {
    //1.localStorageの確認
    if (typeof localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      /* 機能check */
      viewStorage();
      saveLocalStorage();
      selectTable();
      delLocalStorage();
      allClearStorage();
    }
  },
  false
);

// 保存ボタン start
function saveLocalStorage() {
  var save = document.getElementById("save");
  save.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value; // get key
      const value = document.getElementById("textMemo").value; //  get value
      if (key != "" && value != "") {
        let SaveReally = `LocalStorageのテーブルに<span class="custom-text-color-key">「${key}」</span>と<span class="custom-text-color-value">「${value}」</span>を保存(save)します。よろしいでしょうか?`;
        Swal.fire({
          title: "Memo app",
          html: `<img src="img/qstion.gif"> <div style="text-align: center;">${SaveReally}</div>`,
          background: "linear-gradient(#99f, #f99)",
          showCancelButton: true,
        }).then(function (Saveend) {
          if (Saveend.value === true) {
            saveBtn(); //save機能を使用
          }
        });
        questionsound("question");
      } else {
        Swal.fire({
          title: "Memo app",
          html: "Key、Memoはいずれも必須です。",
          type: "error",
          background: "linear-gradient(#99f, #f99)",
          allowOutsideClick: false,
        });
        questionsound("start");
      }
    },
    false
  );
}
// 保存ボタン end


//5.選択ボタン　start
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      selectCheckbox("select"); // selectCheckboxの"select"使用
    },
    false
  );
}
//5.選択ボタン　end


//6.削除ボタン　start
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const chkbox1 = document.getElementsByName("chkbox1");
      const table1 = document.getElementById("table1");
      //　行数を初期化処理
      let w_cnt = 0;
      // Checkboxから対応のmodeを選択
      w_cnt = selectCheckbox("del");
      //　行数が１以上
      if (w_cnt >= 1) {
        let w_confirm = `LocalSotrageから選択している<span class="custom-text-color-w_cnt">「${w_cnt}」</span>件を削除(delete)しますか?`;
        questionsound("question");
        Swal.fire({
          title: "Memo app",
          html: `<img src="img/qstion.gif"> <div style="text-align: center;">${w_confirm}</div>`,
          background: "linear-gradient(#99f, #f99)",
          showCancelButton: true,
        }).then(function (w_confirm) {
          // ユーザーが確定ボタンを押しての処理
          if (w_confirm.value === true) {
            delBtn();   //削除機能を使用
          }
        });
      } else {
        Swal.fire({
          title: "Memo app",
          html: "削除するものを選んでください！",
          type: "error",
          background: "linear-gradient(#99f, #f99)",
          allowOutsideClick: false,
        });
        questionsound("start");
      }
    },
    false
  );

  del_row(); // class:trashボタンをaddEvenListener使用;
}
//6.削除ボタン　end


// version-up5 add-end

// 7.すべて削除 start
function allClearStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click", function (e) {
    e.preventDefault();
    questionsound("question");
    //処理の確認用
    let w_confirm = `LocalStorageのテーブルを<span class="custom-text-color-key">すべて</span>削除(all Clear)します。 よろしいでしょうか`;
    Swal.fire({
      title: "Memo app",
      html: `<img src="img/qstion.gif"> <div style="text-align: center;">${w_confirm}</div>`,
      background: "linear-gradient(#99f, #f99)",
      showCancelButton: true,
    }).then(function (w_confirm) {
      if (w_confirm.value === true) {
        allClearBtn();   //allClear機能を使用
        // label keyとvalueの初期化
        document.getElementById("textKey").value = ""; //labelをクリア
        document.getElementById("textMemo").value = ""; //labelをクリア
      }
    });
  });
}
// 7.すべて削除 end


//　選択機能 start
function selectCheckbox(mode) {
  // let w_sel = "0";
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = ""; // 変数を初期化
  let w_textMemo = ""; // 変数を初期化
  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
        //return w_sel = "1";
      }
      w_cnt++;
    }
  }
  document.getElementById("textKey").value = w_textKey; //HtmlからtextKeyの値をw_textKeyという変数を代入する
  document.getElementById("textMemo").value = w_textMemo; //HtmlからtextMemoの値をw_textKeyという変数を代入する

  // modeがselectの場合の機能対応
  if (mode === "select") {
    if (w_cnt === 1) {
      return w_cnt; // w_cnt　を 1 として返し
    } else {
      Swal.fire({
        title: "Memo app",
        html: "必ず一つ選んでください！",
        type: "error",
        background: "linear-gradient(#99f, #f99)",
        allowOutsideClick: false,
      });
      questionsound("start");
    }
    document.getElementById("textKey").value = ""; //labelをクリア
    document.getElementById("textMemo").value = ""; //labelをクリア
  }
  // modeがdelの場合の機能対応
  if (mode === "del") {
    if (w_cnt > 0) {
      return w_cnt;
    }
  }
}
//　選択機能 end

// 保存機能 start
function saveBtn() {
  const key = document.getElementById("textKey").value; //HtmlからtextKeyの値はkeyという変数を代入する
  const value = document.getElementById("textMemo").value; //HtmlからtextMemoの値はValueという変数を代入する
  localStorage.setItem(key, value); //localStorageからsetItemの機能を使用して、keyとvalueをlocalStorageに保存する
  viewStorage();
  let w_msg = `localStorageに<span class="custom-text-color-key">「${key}」</span>と<span class="custom-text-color-value">「${value}」</span>を保存しました。`;
  Swal.fire({
    title: "Memo app",
    html: w_msg,
    type: "success",
    background: "linear-gradient(#99f, #f99)",
    allowOutsideClick: false,
  });
  questionsound("success");
  document.getElementById("textKey").value = ""; //labelをクリア
  document.getElementById("textMemo").value = ""; //labelをクリア
}
// 保存機能 end

//削除機能 start
function delBtn(){
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  w_cnt = selectCheckbox("del");
  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      localStorage.removeItem(
        table1.rows[i + 1].cells[1].firstChild.data
      );
    }
  }
  viewStorage(); // 値を一度表示すること
  let w_msg = `localStorageから<span class="custom-text-color-w_cnt">「${w_cnt}」</span>件を削除しました。`;
  Swal.fire({
    title: "Memo app",
    html: w_msg,
    type: "success",
    background: "linear-gradient(#99f, #f99)",
    allowOutsideClick: false,
  });
  questionsound("success");
  document.getElementById("textKey").value = ""; //labelをクリア
  document.getElementById("textMemo").value = ""; //labelをクリア
}
//削除機能 end

// version-up5 add-str
//trashで削除機能 start
function del_row() {
  const table1 = document.getElementById("table1"); // get table1
  table1.addEventListener("click", (e) => {
    if (e.target.classList.contains("trash") === true) {
      questionsound("question"); //ボタンを押した、動作開始
      let tr = e.target.parentNode.parentNode; //get 行数の父の父要素
      const key = tr.querySelector("td:nth-child(2)").textContent; //選択行のkeyの部分を取得
      const value = tr.querySelector("td:nth-child(3)").textContent; //選択行のvalueの部分を取得
      if (key) {
        let w_confirm = `LocalSotrageから選択しているkey:<span class="custom-text-color-key">「${key}」</span>とvalue:<span class="custom-text-color-value">「${value}」</span>を削除(delete)します。よろしでしょうか?`;
        Swal.fire({
          title: "Memo app",
          html: `<img src="img/qstion.gif"> <div style="text-align: center;">${w_confirm}</div>`,
          background: "linear-gradient(#99f, #f99)",
          showCancelButton: true,
        }).then(function (w_confirm) {
          if (w_confirm.value === true) {
            //確認動作
            localStorage.removeItem(key); //keyを削除します。
            tr.remove(); //行を削除します。
            let w_msg = `localStorageから<span class="custom-text-color-key">「${key}」</span>と<span class="custom-text-color-value">「${value}」</span>を削除しました。`;
            Swal.fire({
              title: "Memo app",
              html: w_msg,
              type: "success",
              background: "linear-gradient(#99f, #f99)",
              allowOutsideClick: false,
            });
            questionsound("success");
          }
        });
      }
    }
  });
}
//trashで削除機能 end

// すべて削除機能　start
function allClearBtn(){
          //localStorageの削除指令を使用する
          localStorage.clear();
          viewStorage();
          let w_msg = `LocalStorageのデータを<span class="custom-text-color-key">すべて</span>削除しました。`;
          Swal.fire({
            title: "Memo app",
            html: w_msg,
            type: "success",
            background: "linear-gradient(#99f, #f99)",
            allowOutsideClick: false,
          });
          questionsound("success");
}
// すべて削除機能　end

//音声コントロール　start
/**
 * 音声コントロール機能説明:
 * "start" -> NO
 *  "question" -> question
 * "success" -> OK
 */
function questionsound(control) {
  if (control === "start") {
    const qsmusic = new Audio("./sound/mus1.mp3");
    qsmusic.play();
  }
  if (control === "question") {
    const qsmusic = new Audio("./sound/cat.mp3");
    qsmusic.play();
  }
  if (control === "success") {
    const qsmusic = new Audio("./sound/scvoice.mp3");
    qsmusic.play();
  }
}
// 音声コントロール　end

// table / list 管理　start
// localStorageからのデータの取得とテーブルへ表示　start
function viewStorage() {
  const list = document.getElementById("list");

  //htmlのテーブル初期化
  while (list.rows[0]) list.deleteRow(0);

  //localStorageすべての情報の取得
  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    //localStorageのキーと値を表示
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td1.innerHTML = "<input name ='chkbox1' type = 'checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
    td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
  }

  //localStorageのキーと値を表示 end 
  // table / list 管理　end

  //jqueryを使用して、数字を小から大まで並べる start
  $("#table1").tablesorter({
    sortList: [[1, 0]],
  });
  $("#table1").trigger("update");
}

  //jqueryを使用して、数字を小から大まで並べる end