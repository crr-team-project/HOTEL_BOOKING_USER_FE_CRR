import { Outlet, Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MyPageLayout = () => {
  return (
    <div className="mypage-layout">
      <Header />

      <div className="mypage-container">
        <aside className="mypage-sidebar">
          <nav className="mypage-nav">
            <h3 className="nav-title">마이페이지</h3>
            <ul className="nav-list">
              <li>
                <Link to="/mypage" className="nav-link">
                  대시보드
                </Link>
              </li>
              <li>
                <Link to="/mypage/profile" className="nav-link">
                  내 정보
                </Link>
              </li>
              <li>
                <Link to="/mypage/bookings" className="nav-link">
                  예약 내역
                </Link>
              </li>
              <li>
                <Link to="/mypage/reviews" className="nav-link">
                  리뷰 관리
                </Link>
              </li>
              <li>
                <Link to="/mypage/wishlist" className="nav-link">
                  위시리스트
                </Link>
              </li>
              <li>
                <Link to="/mypage/coupons" className="nav-link">
                  쿠폰
                </Link>
              </li>
              <li>
                <Link to="/mypage/points" className="nav-link">
                  포인트
                </Link>
              </li>
              <li>
                <Link to="/mypage/inquiries" className="nav-link">
                  문의 내역
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="mypage-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MyPageLayout;
