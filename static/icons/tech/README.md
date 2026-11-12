# 技術アイコンの出典

同梱の画像は公式の配布元から取得しています。フォントアイコンはサイト同梱の Hack Nerd Font から表示します。

## Leaflet

- 配布元: [Leaflet/Leaflet の favicon.svg](https://github.com/Leaflet/Leaflet/blob/main/docs/docs/images/favicon.svg)
- 元ファイルの blob SHA: `a13e427a2b3111a4dff718e90025f566f1f54bcf`
- リポジトリのライセンス: [BSD-2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)
- 著作権表示とライセンス全文: [leaflet.LICENSE.txt](./leaflet.LICENSE.txt)

## Scratch

- Scratch の「S」単体のマークです。[Scratch 公式サイトのファビコン](https://scratch.mit.edu/favicon.ico)をそのまま同梱しています。
- 「Scratch S」は Scratch Foundation の商標です。このサイトではスキル欄で Scratch を指し示すために使用します。[商標一覧](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232108-scratch-foundation-trademarks-list)・[Scratch Trademark Guidelines](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232107-scratch-trademark-guidelines)

## Zed

- 公式配布のロゴマーク SVG をそのまま同梱しています。ライトテーマでは黒、ダークテーマでは白を表示します。[Zed 公式ブランドページの Logomark](https://zed.dev/brand#logomark)
- Zed の名称とロゴは Zed Industries, Inc. の商標です。エディタを示す目的で使用します。[Zed の商標ガイドライン](https://zed.dev/brand#trademark)

## フォントアイコン

| 技術 | Nerd Fonts のグリフ | 表示内容 |
| --- | --- | --- |
| Arduino IDE | `nf-dev-arduino`（U+E733） | Devicons の Arduino マーク。Arduino の項目と共用。 |
| WSL | `nf-dev-windows`（U+E70F） | Devicons の Windows マーク。既存の WSL 定義を使用。 |
| RealVNC | `nf-md-remote_desktop`（U+F08B9） | Material Design Icons の汎用リモートデスクトップ記号。 |

[Nerd Fonts のグリフ一覧](https://www.nerdfonts.com/cheat-sheet)・[Material Design Icons の remote-desktop](https://pictogrammers.com/library/mdi/icon/remote-desktop/)

WSL の公式ペンギンアイコンには Microsoft のブランド利用条件が適用されます。このサイトでの使用許可を確認できなかったため、WSL 欄には上記の既存グリフを使います。[WSL の商標に関する記載](https://github.com/microsoft/WSL#trademarks)・[Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks)

## 登録方法

色・名前・アイコンは `src/lib/data/techs.ts` に登録します。フォント文字は `icon: ''`、画像は `icon: { src: '/icons/tech/leaflet.svg' }` の形式です。`src` には利用条件を確認した HTTPS の CDN URL も指定できます。

`works.ts` の `tech` は `['svelte', 'leaflet']` のような登録済み ID の配列です。`skills.ts` も同じ ID から名前・色・アイコンを参照します。新しい画像を追加する際も、このファイルに出典と利用条件を記録してください。
