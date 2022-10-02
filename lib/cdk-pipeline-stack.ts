import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {
    CodeBuildStep,
    CodePipeline,
    CodePipelineSource,
    ShellStep,
} from "aws-cdk-lib/pipelines";
import { CdkPipelineStageStack } from './cdk-pipeline-stage-stack';


interface CdkPipelineStackProps extends StackProps {
    prj_name: string;
}
export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkPipelineStackProps) {
    super(scope, id, props);

    // const repo = new codecommit.Repository(this, 'aws-cdk-template-with-CDK-Pipelines', { // Creates a new, empty repository
    //     repositoryName: 'aws-cdk-template-with-CDK-Pipelines',
    // });
    const repo = codecommit.Repository.fromRepositoryName(this, 'repo', 'aws-cdk-template-with-CDK-Pipelines'); // Use existing repository

    const pipeline = new CodePipeline(this, props.prj_name+'-'+this.constructor.name+'-aws-cdk-template-with-CDK-Pipelines',{
        pipelineName: props.prj_name+'-'+this.constructor.name+'-aws-cdk-template-with-CDK-Pipelines',
        synth: new CodeBuildStep('SynthStep', {
            input: CodePipelineSource.codeCommit(repo, 'main'),
            installCommands: [
                'npm install -g aws-cdk'
            ],
            commands: [
                'npm ci',
                'npm run build',
                'npx cdk synth'
            ],
        }),
    });

    const deploy_stack = new CdkPipelineStageStack(this, props.prj_name+'Deploy', {
        prj_name: props.prj_name,
        env: props.env,
    });
    const deployStage = pipeline.addStage(deploy_stack);
  }
}


// memo
// - AWS の CDK pipelines と aws-codepipeline の違い
//   https://zenn.dev/siroken3/scraps/769002c03b31d6
// - CDK Pipelineを導入するときの手順メモ
//   https://zenn.dev/pirosikick/scraps/a3d843cc54fcbf
// - class CodeCommitSourceAction
//   https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-codepipeline-actions.CodeCommitSourceAction.html
// - CREATE NEW PIPELINE - TypeScript Workshop
//   https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines/3000-new-pipeline.html
