import type * as PageTree from 'fumadocs-core/page-tree';
import type { LoaderPlugin } from 'fumadocs-core/source';

/**
 * 从侧栏树中移除空文件夹
 * 无 index 页且 children 为空时不展示（例如 meta.json 里 pages 为 [] 的占位目录）
 */
function pruneEmptyFolderChildren(nodes: PageTree.Node[]): PageTree.Node[] {
  const pruned: PageTree.Node[] = [];

  for (const node of nodes) {
    if (node.type === 'folder') {
      const children = pruneEmptyFolderChildren(node.children);
      const folder: PageTree.Folder = { ...node, children };

      if (folder.index != null || children.length > 0) {
        pruned.push(folder);
      }
      continue;
    }

    pruned.push(node);
  }

  return pruned;
}

export function hideEmptyFoldersPlugin(): LoaderPlugin {
  return {
    name: 'purtmars:hide-empty-folders',
    transformPageTree: {
      root(root) {
        return {
          ...root,
          children: pruneEmptyFolderChildren(root.children),
        };
      },
    },
  };
}