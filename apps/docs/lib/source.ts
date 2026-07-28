import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

// Deliberately un-annotated: fumadocs 16's `loader()` returns a precisely
// typed `LoaderOutput`, and a bare `ReturnType<typeof loader>` widens the
// generic away, which then fails to match the collection's page data.
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
