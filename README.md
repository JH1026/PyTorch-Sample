# PyTorchによる画像分類テスト

## アプリ概要

学習済みモデル(resnet50)によってアップロードした画像を分類させます。<br>
トリミング部分のみを分類に対象にすることが可能です。<br>

## 使用技術

* __フロントエンド__
  * __React.js 17.0.2__
  * __material-ui/core 4.11.4__
  * __eslint 7.28.0__
  * __jest 27.0.3__

* __バックエンド__
  * __Python 3.8.2__
  * __Flask 2.0.1__
  * __torch 1.8.1__
  * __Pillow 8.0.1__

### ローカル環境でのデプロイ
1.  git clone
```terminal
git clone https://github.com/JuneOrg2020/PyTorchTest.git
```

2.  移動
```terminal
cd PyTorchTest
```

3.  pip install
```terminal
pip install -r requirements.txt
```

4.  Flask起動
```terminal
python run.py
```

5.  http://127.0.0.1:5000/ にアクセスする

## 使用画面のイメージ
画像全体での分類結果 <br>
<img src="" width=600><br>
Cropした部分での分類結果 <br>
<img src="" width=600><br>
