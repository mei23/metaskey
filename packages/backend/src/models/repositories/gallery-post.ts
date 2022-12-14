import { EntityRepository, Repository } from 'typeorm';
import { GalleryPost } from '@/models/entities/gallery-post';
import { Packed } from '@/misc/schema';
import { Users, DriveFiles, GalleryLikes } from '../index';
import { awaitAll } from '@/prelude/await-all';
import { User } from '@/models/entities/user';

@EntityRepository(GalleryPost)
export class GalleryPostRepository extends Repository<GalleryPost> {
	public async pack(
		src: GalleryPost['id'] | GalleryPost,
		me?: { id: User['id'] } | null | undefined,
	): Promise<Packed<'GalleryPost'>> {
		const meId = me ? me.id : null;
		const post = typeof src === 'object' ? src : await this.findOneOrFail(src);

		return await awaitAll({
			id: post.id,
			createdAt: post.createdAt.toISOString(),
			updatedAt: post.updatedAt.toISOString(),
			userId: post.userId,
			user: Users.pack(post.user || post.userId, me),
			title: post.title,
			description: post.description,
			fileIds: post.fileIds,
			files: DriveFiles.packMany(post.fileIds),
			tags: post.tags.length > 0 ? post.tags : undefined,
			isSensitive: post.isSensitive,
			likedCount: post.likedCount,
			isLiked: meId ? await GalleryLikes.findOne({ postId: post.id, userId: meId }).then(x => x != null) : undefined,
		});
	}

	public packMany(
		posts: GalleryPost[],
		me?: { id: User['id'] } | null | undefined,
	) {
		return Promise.all(posts.map(x => this.pack(x, me)));
	}
}
