import asyncio

from arcaea_prober_api import ws_arcaea_prober, process_data


def test_api_success():
    data = asyncio.run(ws_arcaea_prober())
    assert data

    results = asyncio.run(process_data(data))
    assert results
