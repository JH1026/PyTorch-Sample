# PyTorchによる画像分類テスト

## アプリ概要

学習済みモデル(resnet50)によってアップロードした画像を分類させます。<br>
トリミング部分のみを分類対象にすることが可能です。<br>

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
  * __selenium 3.141.0__

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
<img src="https://user-images.githubusercontent.com/64642177/123520007-7f83cc00-d6e9-11eb-836a-aacd918494d2.png" width=600><br>
Cropした部分での分類結果 <br>
<img src="https://user-images.githubusercontent.com/64642177/123520008-84488000-d6e9-11eb-877c-94aa237aad17.png" width=600><br>
<br>
<a href="https://pixabay.com/ja/photos/%e3%83%9a%e3%83%83%e3%83%88-%e3%81%8b%e3%82%8f%e3%81%84%e3%81%84-%e5%8b%95%e7%89%a9-3157961/">使用画像</a>
