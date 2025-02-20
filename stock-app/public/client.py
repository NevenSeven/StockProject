from polygon import RESTClient
import config
import json
from typing import cast
from urllib3 import HTTPResponse

client = RESTClient(config.API_KEY)

aggs = cast(
    HTTPResponse,
    client.get_aggs
)