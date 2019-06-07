import * as elb from "@pulumi/awsx/elasticloadbalancingv2";
import * as ecs from "@pulumi/awsx/ecs";

const networkListener = new elb.NetworkTargetGroup("group", { port: 3000 })
    .createListener("listener", { port: 80 });

const service = new ecs.FargateService("service", {
    desiredCount: 2,
    taskDefinitionArgs: {
        containers: {
            service: {
                image: ecs.Image.fromPath("image", "../"),
                cpu: 102,
                memory: 50,
                portMappings: [
                    networkListener
                ]
            }
        }
    }
});

export const hostname = networkListener.endpoint;
