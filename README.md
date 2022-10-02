# aws-cdk-template-with-CDK-Pipelines

## 初期化

### CodePipeline の deploy

下記のコマンドで CodePipeline を手動 deploy する．
CodePipeline を先んじて手動 deploy する必要がある．

```bash
npx cdk deploy AwsCdkTemplate-CdkPipelineStack
```

## SSH
```bash
EC2_INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=AwsCdkTemplate-Ec2Stack/AwsCdkTemplate-Ec2Stack-general_purpose_ec2" \
    --query "Reservations[].Instances[?State.Name=='running'].InstanceId[]" \
    --output text)
ssh -i ~/.ssh/ec2/id_ed25519 admis@$EC2_INSTANCE_ID
```

## よく使うコマンド

### テスト
```
npx npm run test
```
```
npx npm run test -- -u
```

### デプロイ
```bash
npx cdk synth
```
```bash
npx cdk deploy --all --require-approval never
```
```bash
npx cdk destroy --all --force
```

#### パイプラインのデプロイ
```bash
npx cdk deploy AwsCdkTemplate-CdkPipelineStack
```

## 付録

### codecommit

- [git-remote-codecommit を使用して AWS CodeCommit への HTTPS 接続をセットアップする手順](https://docs.aws.amazon.com/ja_jp/codecommit/latest/userguide/setting-up-git-remote-codecommit.html)
