import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost } from '@wpengine/headless/next';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getApolloClient,
} from '@wpengine/headless';
import { gql } from '@apollo/client';
import { HeadlessBlocks } from 'headless-blocks';
import blockComponents from 'blocks/src';
import { CTA, Footer, Header, Hero } from '../components';

export default function Single(): JSX.Element {
  const post = usePost();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={ settings?.title } description={ settings?.description } />
      <main className="content content-single">
        { post?.title && <Hero title={ post?.title } /> }
        <div className="wrap">
          { post && (
            <div>
              <div>
                <HeadlessBlocks
                  postContent={post.content ?? ''}
                  blockComponents={blockComponents}
                />
              </div>
            </div>
          ) }
        </div>
        <CTA
          title="Start your headless journey today"
          buttonText="Get Started"
          buttonURL="https://github.com/wpengine/headless-framework/"
          headingLevel="h2">
          <p>
            Learn more in the{ ' ' }
            <a href="https://github.com/wpengine/headless-framework">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA>
      </main>
      <Footer copyrightHolder={ settings?.title } />
    </>
  );
}

async function getProps(
  context: GetStaticPropsContext | GetServerSidePropsContext,
) {
  const apollo = getApolloClient(context);
  await apollo.query({
    query: gql`
    {
      menus {
        edges {
          node {
            menuItems {
              edges {
                node {
                  url
                  title
                  label
                }
              }
            }
          }
        }
      }
    }
  `});
}

export const getStaticProps = getProps;
export const getServerSideProps = getProps;
