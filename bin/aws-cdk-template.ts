#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkTemplateStack } from '../lib/aws-cdk-template-stack';
import { VpcStack } from '../lib/vpc-stack';
import { SsmStack } from '../lib/ssm-stack';
import { Ec2Stack } from '../lib/ec2-stack';

import { CdkPipelineStack } from '../lib/cdk-pipeline-stack';


const app = new cdk.App();

const prj_name = 'AwsCdkTemplate';
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
}

const aws_cdk_template_stack = new AwsCdkTemplateStack(app, 'AwsCdkTemplateStack', {
  env: env,
});

const vpc_stack = new VpcStack(app, prj_name+'-VpcStack', {
  prj_name: prj_name,
  env: env,
});

const ssm_stack = new SsmStack(app, prj_name+'-SsmStack', {
  prj_name: prj_name,
  env: env,
  vpc: vpc_stack.vpc,
});

const ec2_stack = new Ec2Stack(app, prj_name+'-Ec2Stack', {
  prj_name: prj_name,
  env: env,
  vpc: vpc_stack.vpc,
  ssm_iam_role: ssm_stack.iam_role,
});

const cdk_pipeline_stack = new CdkPipelineStack(app, prj_name+'-CdkPipelineStack', { // AwsCdkTemplate-CdkPipelineStack
  prj_name: prj_name,
  env: env,
});

app.synth()