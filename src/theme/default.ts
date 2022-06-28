import { css } from '@emotion/react'

const extendingBootstrap = css`
  .dropdown-menu {
    .dropdown-divider {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .dropdown-menu {
        box-shadow: 1px 1px 4px lightgray, -1px 1px 4px lightgray;
        border-radius: 5px;
    }
    .dropdown-item input {
        border-color: var(--custom-maximumbluegreen);
    }
    .dropdown-item input:checked {
        background-color: var(--custom-maximumbluegreen);
    }
  }
`;
const globalStyle = css`
  .table {
    box-shadow: 1px 1px 4px lightgray, -1px 1px 4px lightgray;
    border-radius: 5px;
    text-align: left;
    text-transform: uppercase;
    th, td {
      border: none;
    }
    th:first-child, td:first-child {
      padding-left: 2rem;
    }
    td:last-child {
      padding-right: 2rem;
    }
    /* margin: 0.5rem 0.5rem 1rem 0.5rem; // only for responsive props */
    > :not(:first-child) {
      border-top: none;
    }
  }
`;

const defaultTheme = css`
    ${extendingBootstrap}
    ${globalStyle}
`;

export default defaultTheme;