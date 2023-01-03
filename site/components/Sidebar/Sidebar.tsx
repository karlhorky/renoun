import Link from 'next/link'
import { Text } from 'components/Text'
import allDocs from 'mdxts/docs'
import allReact from 'mdxts/react'

export function Sidebar() {
  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '2rem',
      }}
    >
      <a href="/">
        <h1>
          <svg
            width="100"
            height="26"
            viewBox="0 0 100 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.7759 19.023L38.5518 1.02295L59.0001 1.02295L48.7759 19.023Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M48.7759 7.02295L59.0001 25.023L38.5518 25.023L48.7759 7.02295Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M5.82808 1.02393L1 1.02393L0.999996 24.6135L4.64536 24.6135L4.64536 16.6099L4.43474 6.46767L7.72367 17.339L9.74888 17.339L13.378 6.07883L13.1512 16.6099L13.1512 24.6135L16.8128 24.6135L16.8128 1.02393L11.9685 1.02393L8.74438 11.1175L5.82808 1.02393Z"
              fill="white"
            />
            <path
              d="M20.9604 24.6135L26.9226 24.6135C28.0027 24.6135 29.0126 24.4839 29.9523 24.2247C30.9028 23.9654 31.7669 23.5928 32.5446 23.1067C33.2358 22.6639 33.8623 22.1292 34.424 21.5028C34.9964 20.8763 35.4825 20.1797 35.8821 19.4128C36.2925 18.6243 36.6058 17.7548 36.8218 16.8043C37.0486 15.843 37.162 14.8277 37.162 13.7584L37.162 11.9114C37.162 10.7989 37.0432 9.75121 36.8056 8.76831C36.568 7.78541 36.2331 6.88352 35.8011 6.06264C35.3799 5.27416 34.856 4.56129 34.2295 3.92402C33.6139 3.28676 32.9064 2.75751 32.1071 2.33626C31.3727 1.92582 30.5572 1.60719 29.6607 1.38037C28.7642 1.14274 27.8083 1.02393 26.793 1.02393L20.9604 1.02393L20.9604 24.6135ZM24.8974 4.19945L26.793 4.19945C27.4195 4.21025 28.0027 4.28586 28.5428 4.42627C29.0828 4.55588 29.5689 4.7449 30.0009 4.99333C30.595 5.32816 31.108 5.76561 31.5401 6.30566C31.9721 6.83491 32.3177 7.42897 32.577 8.08784C32.7822 8.62789 32.9388 9.21655 33.0468 9.85382C33.1548 10.4911 33.2088 11.1661 33.2088 11.879L33.2088 13.7584C33.2088 14.4821 33.1548 15.1625 33.0468 15.7998C32.9388 16.4371 32.7822 17.0257 32.577 17.5658C32.3393 18.2031 32.0315 18.7701 31.6535 19.267C31.2862 19.753 30.865 20.1581 30.3897 20.4821C29.9253 20.7953 29.4014 21.0383 28.8182 21.2112C28.2457 21.3732 27.6139 21.4542 26.9226 21.4542L24.8974 21.4542L24.8974 4.19945Z"
              fill="white"
            />
            <path
              d="M80.15 4.24811L80.15 1.02399L61.7773 1.02398L61.7773 4.24811L69.0033 4.24811L69.0033 24.6136L72.8755 24.6136L72.8755 4.24811L80.15 4.24811Z"
              fill="white"
            />
            <path
              d="M95.6387 18.5379C95.6387 19.0564 95.5253 19.5154 95.2985 19.9151C95.0825 20.3147 94.7909 20.6496 94.4236 20.9196C94.0456 21.2004 93.5973 21.411 93.0789 21.5515C92.5712 21.6919 92.0204 21.7621 91.4263 21.7621C90.7242 21.7621 90.0762 21.6757 89.4821 21.5028C88.8989 21.33 88.3912 21.0654 87.9592 20.709C87.5163 20.3633 87.1653 19.9259 86.9061 19.3966C86.6576 18.8566 86.5064 18.2247 86.4524 17.501L82.564 17.501C82.5748 18.6352 82.8017 19.6397 83.2445 20.5145C83.6981 21.3894 84.3084 22.1509 85.0753 22.799C85.907 23.4902 86.8845 24.0195 88.0078 24.3867C89.1311 24.7432 90.2706 24.9214 91.4263 24.9214C92.5172 24.9214 93.5541 24.7864 94.537 24.5163C95.5199 24.2355 96.384 23.8197 97.1293 23.2688C97.8638 22.7396 98.447 22.0753 98.8791 21.276C99.3219 20.4767 99.5433 19.5532 99.5433 18.5055C99.5433 17.3714 99.2895 16.3723 98.7819 15.5082C98.285 14.6334 97.6207 13.8827 96.7891 13.2562C96.1194 12.7594 95.3849 12.3381 94.5856 11.9925C93.7972 11.6361 92.9871 11.339 92.1554 11.1014C91.4965 10.907 90.8647 10.6964 90.2598 10.4695C89.6657 10.2427 89.1365 9.97809 88.672 9.67566C88.2184 9.37323 87.8566 9.02219 87.5865 8.62255C87.3165 8.21211 87.1761 7.73686 87.1653 7.19681C87.1653 6.68916 87.2679 6.23011 87.4731 5.81967C87.6783 5.40923 87.9646 5.05819 88.3318 4.76656C88.699 4.48574 89.1311 4.26971 89.6279 4.1185C90.1356 3.95648 90.6864 3.87548 91.2805 3.87548C91.961 3.87548 92.5604 3.97809 93.0789 4.18331C93.6081 4.37773 94.0564 4.64775 94.4236 4.99339C94.7801 5.34982 95.0555 5.77647 95.2499 6.27332C95.4551 6.75937 95.5847 7.29942 95.6387 7.89348L99.4947 7.89348C99.4947 6.82417 99.2787 5.85208 98.8467 4.97719C98.4254 4.0915 97.8476 3.33002 97.1131 2.69276C96.3786 2.06629 95.5145 1.58025 94.5208 1.23461C93.5379 0.878175 92.474 0.699957 91.3291 0.699956C90.249 0.699956 89.2175 0.851171 88.2346 1.1536C87.2625 1.44523 86.4092 1.87187 85.6747 2.43353C84.9403 3.00599 84.357 3.69726 83.925 4.50734C83.4929 5.30662 83.2769 6.20851 83.2769 7.21301C83.2769 8.1419 83.4605 8.97899 83.8278 9.72426C84.2058 10.4587 84.7242 11.1176 85.3831 11.7009C86.042 12.2733 86.8359 12.7918 87.7648 13.2562C88.7044 13.7099 89.7305 14.0933 90.8431 14.4065C91.5667 14.6118 92.2202 14.844 92.8035 15.1032C93.3975 15.3516 93.9106 15.6325 94.3426 15.9457C94.7531 16.2805 95.0717 16.6586 95.2985 17.0798C95.5253 17.501 95.6387 17.9871 95.6387 18.5379Z"
              fill="white"
            />
          </svg>
        </h1>
      </a>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Docs</h2>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {allDocs.map((data) => {
            return (
              <li key={data.slug}>
                <Link href={data.slug} className="link">
                  <Text>{data.name}</Text>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>React</h2>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {allReact.map((data) => {
            return (
              <li key={data.slug}>
                <Link href={data.slug} className="link">
                  <Text>{data.name}</Text>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
