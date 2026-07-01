import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  House,
  Search,
  ShoppingCart,
  User,
  LogOut,
  BookOpen,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Heart,
  Globe,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const MainLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="main-header">
        <div className="main-header__inner">
          {/* Logo */}
          <Link to="/" className="main-logo">
            <div className="main-logo__icon">
              <BookOpen size={22} />
            </div>
            <span className="main-logo__text">Library SDN302</span>
          </Link>

          {/* Search */}
          <div className="main-search">
            <Search className="main-search__icon" size={17} />
            <input
              className="main-search__input"
              placeholder="Search books, authors, categories..."
            />
          </div>

          {/* Navigation */}
          <nav className="main-nav">
            <Link
              to="/"
              className={`main-nav__link ${isActive("/") ? "main-nav__link--active" : ""}`}
            >
              <House size={17} />
              <span>Home</span>
            </Link>

            <div className="main-nav__divider" />

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="main-nav__user">
                  <div className="main-nav__avatar">
                    {getInitials(user?.fullname)}
                  </div>
                  <span>{user?.fullname || "User"}</span>
                </Link>

                <button
                  className="main-nav__logout"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut size={17} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="main-nav__link">
                  <User size={17} />
                  <span>Log in</span>
                </Link>
                <Link to="/register" className="main-nav__link">
                  <span>Sign up</span>
                </Link>
              </>
            )}

            <div className="main-nav__divider" />

            <Link to="/cart" className="main-nav__cart">
              <ShoppingCart size={19} />
              {getCartCount() > 0 && (
                <span className="main-nav__badge">{getCartCount()}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="main-content">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="main-footer__inner">
          <div className="main-footer__grid">
            {/* Brand */}
            <div className="main-footer__brand">
              <div className="main-footer__brand-logo">
                <div className="main-footer__brand-icon">
                  <BookOpen size={20} />
                </div>
                <span className="main-footer__brand-name">Library SDN302</span>
              </div>
              <p className="main-footer__brand-desc">
                Your digital library companion. Discover, rent, and read
                thousands of books from our curated collection. Built with ❤️
                for book lovers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="main-footer__section-title">Quick Links</h4>
              <ul className="main-footer__links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/books">All Books</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/authors">Authors</Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="main-footer__section-title">Account</h4>
              <ul className="main-footer__links">
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="main-footer__section-title">Contact</h4>
              <div className="main-footer__contact-item">
                <Mail size={15} />
                <span>library@sdn302.edu.vn</span>
              </div>
              <div className="main-footer__contact-item">
                <Phone size={15} />
                <span>+84 123 456 789</span>
              </div>
              <div className="main-footer__contact-item">
                <MapPin size={15} />
                <span>FPT University, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="main-footer__bottom">
            <p className="main-footer__copyright">
              © 2026 Library SDN302. All rights reserved.
            </p>
            <div className="main-footer__socials">
              <a href="#" className="main-footer__social-link" title="Source">
                <ExternalLink size={16} />
              </a>
              <a href="#" className="main-footer__social-link" title="Support">
                <Heart size={16} />
              </a>
              <a href="#" className="main-footer__social-link" title="Website">
                <Globe size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
