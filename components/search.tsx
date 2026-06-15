'use client';

import { createTokenizer } from '@orama/tokenizers/mandarin';
import { create } from '@orama/orama';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { oramaStaticClient } from 'fumadocs-core/search/client/orama-static';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';

function initOrama() {
  return create({
    schema: { _: 'string' },
    components: {
      tokenizer: createTokenizer(),
    },
  });
}

export function StaticSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({
    client: oramaStaticClient({
      initOrama,
      search: {
        threshold: 0,
        tolerance: 0,
      },
    }),
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
