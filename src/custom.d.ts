import { AriaAttributes } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    link_component?: string;
    link_name?: string;
    social_platform?: string;
    link_event?: string;
    search_term?: string;
    search_result_status?: string;
    article_category?: string;
    article_name?: string;
    article_id?: string;
    error_message?: string;
  }
}