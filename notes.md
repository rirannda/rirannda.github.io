# Design notes

## Design

- 上からヘッダー、ボディ、コマンド
- ヘッダー(タイトルなど)
  - バーガーメニュー
- 常に画面下部にターミナル風の入力ボックス
  - ボックス右端に上向き矢印でターミナル履歴等全画面
  - 設定されたUNIXコマンドで動作
    - [x] `cd`,`ls`,`pwd`,`help`,`clear`:実環境と同様に動作
      - `cd about`などでボディの表示を切り替え(バーガーメニューからも可能)
    - [x]Permission deniedネタ
    - [x]`whoami`で名前
    - [x]`date`で現在時刻
    - [x]`uname`:PortfolioOS
    - [ ]`open github`などでgithubを別タブで開いたり
    - [x]`neofetch`AAが作れれば
    - [x]`reboot`で演出を入れてからリロード
    - [ ]`theme light`or`dark`でテーマ切り替え(これもバーガーメニュー内にもボタン)
- 読み込み中演出(短め,長いとうざい)
- 読み込み、reboot演出ともにLinux風、フォントも変える

```text
  Booting `PortfolioOS Folix'

Loading Kernel Folix ...
Loading My Portfolio ...
```

```text
[ OK ] Stopped svelte.service.
[ OK ] Stopped typescript.service.
[ OK ] Stopped portfolio.service.
[ OK ] Unmounted /home.
[ OK ] Reached target Unmount All Filesystems.
[ OK ] Reached target Shutdown.
[ OK ] Started Reboot.

Rebooting PortfolioOS v0.0.0 ...
```

---

## Contents

- About
- Projects
- Skills
- Environment
- Contact

---

## Tech Stack

- SvelteKit
  - Svelte
- TailwindCSS
- vitest
- pnpm

---

## Components

- Burgermenu
- body
  - pages(About,Projects,Skills,etc.)
- command input box

## 未実装

- [x] HeaderのGoToTop機能と装飾
- [ ] レスポンシブ対応
- [x] コマンド自動補完
- [x] darkテーマのcss
- [x] `help (commands)`や`(command) -h`,`(command) --help`
- [x] 内容の1ファイル化(スクロールですべての情報を見れるように、コマンドもそこに飛ぶように：プロジェクトは詳細を別ページで置いても良いかも)
- [x] ターミナル入力ラインの最小化(起動時はヘッダーと内容とコマンドライン出現ボタンのみ、出現ボタンでコマンドラインと履歴最大化ボタンを配置して出現ボタンを隠す)
- [ ] lang=EN(優先度低)
