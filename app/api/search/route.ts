import { createTokenizer } from '@orama/tokenizers/mandarin';
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// 中文文档需 Mandarin 分词；english 会把中文当无词边界文本，几乎搜不到
export const { GET } = createFromSource(source, {
  components: {
    tokenizer: createTokenizer(),
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
});
