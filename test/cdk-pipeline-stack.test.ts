import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../lib/vpc-stack';

import { CdkPipelineStack } from '../lib/cdk-pipeline-stack';


test('CdkPipelineStack', () => {
  
  const app = new cdk.App();

  const prj_name = 'AwsCdkTemplate';
  const env = {
    account: 'test-account',
    region: 'test-region'
  }

  // WHEN
  const cdk_pipeline_stack = new CdkPipelineStack(app, prj_name+'-CdkPipelineStack', { // AwsCdkTemplate-CdkPipelineStack
    prj_name: prj_name,
    env: env,
  });

  // THEN
  expect(Template.fromStack(cdk_pipeline_stack).toJSON()).toMatchSnapshot();

});
