# 技術アイコンの出典

SVG は公式リポジトリから取得し、形状・色を変更せずに同梱しています。

## Leaflet

- 配布元: [Leaflet/Leaflet の favicon.svg](https://github.com/Leaflet/Leaflet/blob/main/docs/docs/images/favicon.svg)
- 元ファイルの blob SHA: `a13e427a2b3111a4dff718e90025f566f1f54bcf`
- リポジトリのライセンス: [BSD-2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)
- 著作権表示とライセンス全文: [leaflet.LICENSE.txt](./leaflet.LICENSE.txt)

## Scratch

- 配布元: [scratchfoundation/scratch-gui の scratch-logo.svg](https://github.com/scratchfoundation/scratch-gui/blob/develop/src/components/menu-bar/scratch-logo.svg)
- 元ファイルの blob SHA: `28b62731df177f732aff99206c29cd0d4b05dfca`
- 商標の権利者: Scratch Foundation
- 利用条件: [Scratch Trademark Guidelines](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232107-scratch-trademark-guidelines)（2026-09-14 更新版）

Scratch の使用技術としての説明・参照に使用します。ロゴの改変、自分の製品のアイコンやブランドとしての使用、Scratch Foundation による公式の提携・支援を示唆する表示は行わないでください。ソースコードの AGPL はロゴの商標使用許諾を与えるものではありません。

## 登録方法

色・名前・アイコンは `src/lib/data/techs.ts` に登録します。フォント文字は `icon: ''`、SVG は `icon: { src: '/icons/tech/leaflet.svg' }` の形式です。`src` には利用条件を確認した HTTPS の CDN URL も指定できます。

`works.ts` の `tech` は `['svelte', 'leaflet']` のような登録済み ID の配列です。`skills.ts` も同じ ID から名前・色・アイコンを参照します。新しい SVG を追加する際も、このファイルに出典と利用条件を記録してください。
