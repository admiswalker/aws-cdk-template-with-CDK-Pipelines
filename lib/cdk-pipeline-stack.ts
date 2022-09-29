import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
//import { InstanceType, NatInstanceImage, NatProvider } from 'aws-cdk-lib/aws-ec2';
//import { CodePipeline } from 'aws-cdk-lib/aws-events-targets';
//import { CdkPipeline, SimpleSynthAction } from 'aws-cdk-lib/pipelines';
//import * as CodePipeline from 'aws-cdk-lib/aws-codepipeline';
//import * as CodePipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import {
    CodePipeline,
    CodePipelineSource,
    ShellStep,
} from "aws-cdk-lib/pipelines";

interface CdkPipelineStackProps extends StackProps {
    prj_name: string;
}
export class CdkPipelineStack extends Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: CdkPipelineStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, props.prj_name+'-'+this.constructor.name+'-cdk_pipelines_for_deploy', {
        synth: new ShellStep('Synth', {
            input: CodePipelineSource.connection(
                'OWNER/REPO',
                'main',
                {
                    connectionArn: 'arn:aws:codecommit:ap-northeast-1:572544462781:aws-cdk-template-with-CDK-Pipelines',
                }
            ),
            commands: [
                'npx npm ci',
                'npx npm run build',
                'npx cdk synth',
            ],
            primaryOutputDirectory: './cdk.out',
        }),
        //crossAccountKeys: true,
    });
    /*
    const pipeline = new CodePipeline.Pipeline(this, props.prj_name+'-'+this.constructor.name+'-cdk_pipelines_for_deploy', {
        pipelineName: `${props.prj_name}-pipeline`,
        stages: [
            {
                stageName: 'source',
                actions: [],
            },
            {
                stageName: 'build',
                actions: [],
            },
            {
                stageName: 'deploy',
                actions: [],
            },
        ],
    });
    */
        /*
    const pipeline = new aws_codepipeline.Pipeline(this, props.prj_name+'-'+this.constructor.name+'-cdk_pipelines_for_deploy', {
        pipelineName: props.prj_name+'-'+this.constructor.name+'-cdk_pipelines_for_deploy',
        

        stages: [
            {
                stageName: 'Development',
            }
        ],
    });
    */
    /*
    this.vpc = new ec2.Vpc(this, props.prj_name+'-'+this.constructor.name+'-vpc_for_ec2_and_ssm', {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      natGatewayProvider: ec2.NatProvider.instance({
        instanceType: new InstanceType('t3.nano'),
        machineImage: new NatInstanceImage(),
      }),
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 27,
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 27,
        },
      ],
    });
    */
  }
}



// memo
// - AWS の CDK pipelines と aws-codepipeline の違い
//   https://zenn.dev/siroken3/scraps/769002c03b31d6
// - CDK Pipelineを導入するときの手順メモ
//   https://zenn.dev/pirosikick/scraps/a3d843cc54fcbf
// - class CodeCommitSourceAction
//   https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-codepipeline-actions.CodeCommitSourceAction.html
