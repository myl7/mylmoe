import asyncio

from req_arcaea_prober import ws_arcaea_prober


def test_ws_arcaea_prober_work():
    data = asyncio.run(ws_arcaea_prober())
    assert bool(data)
