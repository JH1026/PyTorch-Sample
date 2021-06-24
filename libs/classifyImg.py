import json

import torch
import torchvision
from PIL import Image
from torch.nn import functional as F
from torchvision import transforms

class ClassifyImg():

    def get_classes(self):
        with open("./class_index/imagenet_class_index.json" ,encoding="utf-8") as f:
            data = json.load(f)
            self.class_names = [x["ja"] for x in data]

    def get_device(self, use_gpu=False):
        if use_gpu and torch.cuda.is_available():
            torch.backends.cudnn.deterministic = True
            self.device = torch.device("cuda")
        else:
            self.device = torch.device("cpu")

    def set_model(self, model='resnet50'):
        self.model = torchvision.models.resnet50(pretrained=True).to(self.device)
        self.get_classes()

    def set_transform(self):
        self.transform = transforms.Compose(
            [
                transforms.Resize(256),
                transforms.CenterCrop(224),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
                ),
            ]
        )

    def set_img(self, filename):
        img = Image.open(filename)
        img = img.convert("RGB")
        self.inputs = self.transform(img)
        self.inputs = self.inputs.unsqueeze(0).to(self.device)

    def predict(self):
        self.model.eval()
        outputs = self.model(self.inputs)

        self.batch_probs = F.softmax(outputs, dim=1)

    def get_output(self, max=5):
        batch_probs, batch_indices = self.batch_probs.sort(dim=1, descending=True)
        
        results = list()
        for probs, indices in zip(batch_probs, batch_indices):
            for k in range(max):
                results.append({
                  'name': self.class_names[indices[k]],
                  'prob': str(probs[k].data.numpy())
                })

        return results
