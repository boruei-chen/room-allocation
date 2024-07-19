import styled from 'styled-components';

const BlockText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    &:nth-child(1) {
      color: #232323;
    }
    &:nth-child(2) {
      color: #B9B9B9;
      margin-top: 3px;
    }
  }
`;

const BlockRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BlockContent = styled.div`
  ${BlockRow} {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const BlockTitle = styled.h5`
  color: #232323;
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 15px 0;
`;

const Block = styled.div`
  padding: 15px 0;
`;

const Content = styled.div`
  ${Block} {
    &:not(:last-child) {
      border-bottom: 1px solid #F2F2F2;
    }
  }
`;

const Title = styled.h3`
  color: #232323;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 15px 0;
`;

export const RoomAllocation = Object.assign(
  styled.div`
    padding: 20px;
  `,
  {
    Title,
    Content,
    Block,
    BlockTitle,
    BlockContent,
    BlockRow,
    BlockText
  }
);
