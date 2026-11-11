
import styled from "@emotion/styled";
import { theme } from "../styles/theme";

// 상세 페이지 전체 레이아웃
export const DetailPage = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  color: ${theme.colors.text};

  /* 목록으로 돌아가기 */
  .back-link {
    display: inline-block;
    margin-bottom: 24px;
    color: #aaaaaa;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  /* 영화 배경, 포스터, 주요 정보 */
  .hero {
    display: flex;
    align-items: center;
    gap: 32px;
    min-height: 350px;
    padding: 32px;
    border-radius: 12px;
    background-color: #242424;
    background-size: cover;
    background-position: center;
  }

  .poster {
    width: 200px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .hero-info h1 {
    margin: 0 0 20px;
    font-size: 32px;
  }

  .hero-info p {
    margin: 10px 0;
    color: #dddddd;
  }

  /* 영화 장르 */
  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
  }

  .genres span {
    padding: 6px 12px;
    background-color: #333333;
    border-radius: 20px;
    font-size: 13px;
  }

  /* 줄거리 및 기본 정보 */
  .content-section {
    margin-top: 40px;
  }

  .content-section h2 {
    margin-bottom: 20px;
    font-size: 22px;
  }

  .overview {
    color: #cccccc;
    line-height: 1.8;
  }

  /* 기본 정보 카드 배치 */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .info-item {
    padding: 20px;
    background-color: #292929;
    border-radius: 10px;
    overflow-wrap: anywhere;
  }

  .info-item p {
    margin: 0 0 10px;
    color: #aaaaaa;
    font-size: 14px;
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      align-items: flex-start;
    }

    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 20px;
    }

    .poster {
      width: 160px;
    }

    .hero-info h1 {
      font-size: 26px;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }
  }
`;
