import styled, { css } from 'styled-components';

export const media = {
  sp: (styles: any) => css`
    @media (max-width: 979px) {
      ${styles}
    }
  `,
  pc : (styles: any) => css`
    @media (min-width: 980px) {
      ${styles}
    }
  `,
};