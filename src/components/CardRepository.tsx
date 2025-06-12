import { Card, Col, Row } from "antd"
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
      <p>Loading Repositories</p>
    :
      <Row gutter={[8, 8]}>
        {
          repositories?.map((repo, index) => (
            <Col key={index} xs={24} md={8} lg={8}>
              <Card
                style={{ minHeight: '200px' }}
                title={<p style={{ marginLeft: '36px' }}>{repo.name}</p>}
                extra={
                <span>
                  {repo.stargazers_count}
                  <StarFilled style={{marginLeft: '8px' }} />
                </span>}
              >
                {repo.name} <br />
                {repo.description} <br />
              </Card>
            </Col>
          ))
        }
    </Row>
}

export default CardRepository