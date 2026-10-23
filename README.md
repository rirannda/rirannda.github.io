# PortfoliOS (rirannda's Portfolio)

EN:[README_EN.md](README_EN.md)

[こちら](https://rirannda.github.io)からアクセスできます。

## About This

ターミナル風のCUIを特徴としたポートフォリオサイトです。
通常のスクロールやクリック操作に加えて、画面下部のコマンドラインにUNIX風のコマンドを入力することでサイト内を移動できるギミックが実装されています。

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** pnpm
- **Deployment:** GitHub Pages (via GitHub Actions)

## Terminal

画面右下のボタンから開くと入力欄にフォーカスします。Escまたは`exit`で閉じられます。
表示されたコマンドのボタンをクリックして実行することもできます。

```sh
ls projects                 # 作品のID一覧
cat typ-hl                  # 作品の説明（名前・ID・パスを指定可能）
open typ-hl                 # 作品のGitHubリポジトリ
open portfolio-os demo      # demoUrlが設定されている場合にデモを開く
ls skills                   # スキルのID一覧
cat skills/svelte           # スキルの説明
cat about.txt               # プロフィール
lang en                     # 日本語: lang ja / 英語: lang en
history                     # 履歴を表示（クリックで入力欄へ戻す）
clear                       # 出力だけを消す（resetも同じ動作）
help                        # 全コマンド一覧
```

`cd projects`は作品ページに移動します。既存の`works`も別名として利用できます。
`cd about`、`cd /about`、`cd ~/portfolio/about`は同じ移動先を指します。
Tabは候補が1件のときだけ補完し、候補一覧は表示しません。↑↓で履歴を呼び出せます。

## Special Thanks

_"PortfoliOS"_ は、オープンソース界隈の無数の開発者からのインスピレーションを受けて出来上がりました。
素晴らしいポートフォリオやコードを公開してくださっているすべてのクリエイターに敬意と感謝を捧げます。
