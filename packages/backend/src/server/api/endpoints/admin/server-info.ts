import * as os from 'os';
import * as si from 'systeminformation';
import { getConnection } from 'typeorm';
import define from '../../define';
import { redisClient } from '../../../../db/redis';

export const meta = {
	requireCredential: true,
	requireModerator: true,

	tags: ['admin', 'meta'],

	params: {
	},

	res: {
		type: 'object',
		optional: false, nullable: false,
		properties: {
			machine: {
				type: 'string',
				optional: false, nullable: false,
			},
			os: {
				type: 'string',
				optional: false, nullable: false,
				example: 'linux',
			},
			node: {
				type: 'string',
				optional: false, nullable: false,
			},
			psql: {
				type: 'string',
				optional: false, nullable: false,
			},
			cpu: {
				type: 'object',
				optional: false, nullable: false,
				properties: {
					model: {
						type: 'string',
						optional: false, nullable: false,
					},
					cores: {
						type: 'number',
						optional: false, nullable: false,
					},
				},
			},
			mem: {
				type: 'object',
				optional: false, nullable: false,
				properties: {
					total: {
						type: 'number',
						optional: false, nullable: false,
						format: 'bytes',
					},
				},
			},
			fs: {
				type: 'object',
				optional: false, nullable: false,
				properties: {
					total: {
						type: 'number',
						optional: false, nullable: false,
						format: 'bytes',
					},
					used: {
						type: 'number',
						optional: false, nullable: false,
						format: 'bytes',
					},
				},
			},
			net: {
				type: 'object',
				optional: false, nullable: false,
				properties: {
					interface: {
						type: 'string',
						optional: false, nullable: false,
						example: 'eth0',
					},
				},
			},
		},
	},
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, async () => {
	const memStats = await si.mem();
	const fsStats = await si.fsSize();
	const netInterface = await si.networkInterfaceDefault();

	return {
		machine: os.hostname(),
		os: os.platform(),
		node: process.version,
		psql: await getConnection().query('SHOW server_version').then(x => x[0].server_version),
		redis: redisClient.server_info.redis_version,
		cpu: {
			model: os.cpus()[0].model,
			cores: os.cpus().length,
		},
		mem: {
			total: memStats.total,
		},
		fs: {
			total: fsStats[0].size,
			used: fsStats[0].used,
		},
		net: {
			interface: netInterface,
		},
	};
});
