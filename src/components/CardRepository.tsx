import { Card, Col, Row, Spin } from "antd"
import { StarFilled } from '@ant-design/icons';
import type { RepositoryResponse } from "../helpers/types";

type Props = {
  isLoadingRepositories: boolean
  isFetchingRepositories: boolean
  repositories: RepositoryResponse | undefined
}

const CardRepository = ({ isLoadingRepositories, isFetchingRepositories, repositories }: Props) => {
  return isLoadingRepositories || isFetchingRepositories
    ? 
      <Spin spinning={isFetchingRepositories || isLoadingRepositories} />
    :
      <Row gutter={[8, 8]}>
        {
          repositories?.length ?? 0 ? repositories?.map((repo, index) => (
            <Col key={index} xs={24} md={8} lg={8}>
              <Card
                style={{ minHeight: '200px' }}
                title={<p style={{ marginLeft: '36px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '150px' }}>{repo.name}</p>}
                extra={
                <span>
                  <StarFilled style={{marginLeft: '8px' }} />
                  {repo.stargazers_count}
                </span>}
              >
                {repo.name} <br />
                {repo.description} <br />
              </Card>
            </Col>
          ))
          :
            <Col span={24}>
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>No repositories found</p>
            </Col>
        }
      </Row>
}

export default CardRepository