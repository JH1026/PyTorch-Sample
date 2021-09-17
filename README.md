# PyTorch Test

## Overview

This App classifies uploaded images by trained model (resnet50). <br>
It is possible to classify only the trimmed image.<br>

## 使用技術

* __Frontend__
  * __typescript 4.3.2__ 
  * __React.js 17.0.2__
  * __material-ui/core 4.11.4__
  * __eslint 7.28.0__
  * __jest 27.0.3__
  * __webpack 5.39.0__

* __Backend__
  * __Python 3.8.2__
  * __Flask 2.0.1__
  * __torch 1.8.1__
  * __Pillow 8.0.1__
  * __selenium 3.141.0__

### Local Deploy
1.  git clone
```terminal
git clone https://github.com/JuneOrg2020/PyTorchTest.git
```

2.  Move directory
```terminal
cd PyTorchTest
```

3.  pip install
```terminal
pip install -r requirements.txt
```

4.  Activate Flask
```terminal
python run.py
```

5.  Access to http://127.0.0.1:5000/

## Image
Classification result in the entire image  <br>
<img src="https://user-images.githubusercontent.com/64642177/123520007-7f83cc00-d6e9-11eb-836a-aacd918494d2.png" width=600><br>
Classification result in the trimed image <br>
<img src="https://user-images.githubusercontent.com/64642177/123520008-84488000-d6e9-11eb-877c-94aa237aad17.png" width=600><br>
<br>
<a href="https://pixabay.com/ja/photos/%e3%83%9a%e3%83%83%e3%83%88-%e3%81%8b%e3%82%8f%e3%81%84%e3%81%84-%e5%8b%95%e7%89%a9-3157961/">Used Image</a>
