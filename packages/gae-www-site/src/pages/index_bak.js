import React from 'react';

import { Skeleton } from '@diff/shared-components';
import Layout from '../components/Layout';
import { Anchor } from '../components/site-components';

import background from '../components/images/background.png';
import DetailSection from '../components/DetailSection';

const PSkeleton = () => (
  <React.Fragment>
    <Skeleton className="col-md-6" />
    <Skeleton className="col-md-5" />
    <Skeleton className="col-md-4" />
    <Skeleton className="col-md-6" />
  </React.Fragment>
);

const IndexPage = () => (
  <Layout>
    <div className="container-fluid">
      <div className="jumbotron  bg-white ">
        <div className="container-lg">
          <div className="row flex-container">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 z2 info">
              <div className="space-32">
                <h1 className="space-16">
                  Collaborate faster, easier, and in context
                </h1>
                <p>
                  Diff helps teams track changes and collaborate faster and
                  easier in their web applications. Use diff to create comments,
                  attach designs or screenshots, and share feedback.
                </p>
              </div>
              <Anchor href="/app/signup" className="primary button btn-info ">
                Install now
              </Anchor>
            </div>
            <div className="col ">
              <img src={background} className="img-fluid info-img" />
            </div>
          </div>
        </div>
      </div>
      <DetailSection
        className="bg-light"
        flexRight
        left={() => (
          <React.Fragment>
            <h3>Make Comments</h3>
            <PSkeleton />
          </React.Fragment>
        )}
        right={() => <Skeleton className="img align-center" />}
      />
      <DetailSection
        flexLeft
        right={() => (
          <React.Fragment>
            <h3>Collaborate with Workspaces</h3>
            <PSkeleton />
          </React.Fragment>
        )}
        left={() => <Skeleton className="img align-center" />}
      />
      <DetailSection
        className="bg-light"
        flexRight
        left={() => (
          <React.Fragment>
            <h3>Attach files as you go</h3>
            <PSkeleton />
          </React.Fragment>
        )}
        right={() => <Skeleton className="img align-center" />}
      />

      <div className="container">
        <div className="row section">
          <div className="col">
            <h3 className="text-center">Why we created diff</h3>
          </div>
        </div>
      </div>
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="container-lg">
          <div className="row">
            <div className="col-12 col-md">
              <small className="d-block mb-3 text-muted">
                &copy;2018 getDiff, Inc.
              </small>
            </div>
            <div className="col-6 col-md">
              <h5>Product</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Company</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Team
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Support</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Email
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Submit feedback
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Layout>
);

export default IndexPage;
