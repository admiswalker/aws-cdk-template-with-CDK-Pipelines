import { Construct } from 'constructs';
import { Stage, StageProps } from 'aws-cdk-lib';
import { AwsCdkTemplateStack } from '../lib/aws-cdk-template-stack';
import { VpcStack } from '../lib/vpc-stack';
import { SsmStack } from '../lib/ssm-stack';
import { Ec2Stack } from '../lib/ec2-stack';


interface CdkPipelineStageStackProps extends StageProps {
    prj_name: string;
}
export class CdkPipelineStageStack extends Stage {
  constructor(scope: Construct, id: string, props: CdkPipelineStageStackProps) {
    super(scope, id, props);

    const aws_cdk_template_stack = new AwsCdkTemplateStack(this, 'AwsCdkTemplateStack', {
        env: props.env,
      });
      
      const vpc_stack = new VpcStack(this, props.prj_name+'-VpcStack', {
        prj_name: props.prj_name,
        env: props.env,
      });
      
      const ssm_stack = new SsmStack(this, props.prj_name+'-SsmStack', {
        prj_name: props.prj_name,
        env: props.env,
        vpc: vpc_stack.vpc,
      });
      
      const ec2_stack = new Ec2Stack(this, props.prj_name+'-Ec2Stack', {
        prj_name: props.prj_name,
        env: props.env,
        vpc: vpc_stack.vpc,
        ssm_iam_role: ssm_stack.iam_role,
      });

  }
}

// memo
// - ADD APPLICATION TO PIPELINE - TypeScript Workshop
//   https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines/4000-build-stage.html
