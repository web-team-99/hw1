import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index(self):
        self.client.get("/")

    @task
    def nodeWrite(self):
        self.client.get("/node/write?num=45")

    @task
    def nodeSha(self):
        self.client.post("/node/sha",{
            "fnum": 45,
            "snum": 87
        })
    
    @task
    def goWrite(self):
        self.client.get("/go/write?lineNumber=45")

    @task
    def goSha(self):
        self.client.post("/go/sha",{
            "fnum": 45,
            "snum": 87
        })
