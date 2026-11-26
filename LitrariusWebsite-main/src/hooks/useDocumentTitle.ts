import { useEffect } from 'react';

interface UseDocumentTitleOptions {
  title: string;
  description?: string;
}

export function useDocumentTitle({ title, description }: UseDocumentTitleOptions) {
  useEffect(() => {
    // Update <title>
    document.title = title;

    // Update <meta name="description">
    if (description) {
      let metaTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'description';
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', description);
    }
  }, [title, description]);
}