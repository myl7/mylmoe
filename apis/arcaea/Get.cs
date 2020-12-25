using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace mylmoe_arcaea
{
    public static class Get
    {
        [FunctionName("Get")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]
            HttpRequest req, ILogger log)
        {
            var connStr = Environment.GetEnvironmentVariable("COSMOS_CONN_STR");
            var account = CloudStorageAccount.Parse(connStr);
            var client = account.CreateCloudTableClient(new TableClientConfiguration());
            var table = client.GetTableReference("arcaea");

            var op = TableOperation.Retrieve<ArcaeaRes>("serve", "latest");
            var res = await table.ExecuteAsync(op);
            if (res == null)
            {
                log.LogError("Retrieving latest arcaea result failed");
                return new StatusCodeResult(500);
            }

            var data = (res.Result as ArcaeaRes)!.Res;
            return new FileStreamResult(new MemoryStream(data), "application/octet-stream");
        }
    }

    public class ArcaeaRes : TableEntity
    {
        public byte[] Res { get; set; }

        public ArcaeaRes()
        {
        }

        public ArcaeaRes(string type, string date)
        {
            PartitionKey = type;
            RowKey = date;
        }
    }
}
