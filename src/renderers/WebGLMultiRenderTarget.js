import { WebGLRenderTarget } from './WebGLRenderTarget.js';

class WebGLMultiRenderTarget extends WebGLRenderTarget {

	constructor( width, height, count ) {

		super( width, height );

		const texture = this.texture;

		this.texture = [];

		for ( let i = 0; i < count; i ++ ) {

			this.texture[ i ] = texture.clone();

		}

	}

	setTexture( texture ) {

		this.texture.length = 0;

		for ( let i = 0, il = texture.length; i < il; i ++ ) {

			texture[ i ].image = {
				width: this.width,
				height: this.height,
				depth: this.depth
			};

			this.texture[ i ] = texture[ i ];

		}

	}

	setSize( width, height, depth = 1 ) {

		if ( this.width !== width || this.height !== height || this.depth !== depth ) {

			this.width = width;
			this.height = height;
			this.depth = depth;

			for ( let i = 0, il = this.texture.length; i < il; i ++ ) {

				this.texture[ i ].image.width = width;
				this.texture[ i ].image.height = height;
				this.texture[ i ].image.depth = depth;

			}

			this.dispose();

		}

		this.viewport.set( 0, 0, width, height );
		this.scissor.set( 0, 0, width, height );

	}

	copy( source ) {

		this.width = source.width;
		this.height = source.height;
		this.depth = source.depth;

		this.viewport.copy( source.viewport );

		this.depthBuffer = source.depthBuffer;
		this.stencilBuffer = source.stencilBuffer;
		this.depthTexture = source.depthTexture;

		this.texture.length = 0;

		for ( let i = 0, il = source.texture.length; i < il; i ++ ) {

			this.texture[ i ] = source.texture[ i ].clone();

		}

		return this;

	}

	setCount( count ) {

		if ( this.texture.length !== count ) {

			this.dispose();

			if ( count > this.texture.length ) {

				for ( let i = this.texture.length; i < count; i ++ ) {

					this.texture[ i ] = this.texture[ 0 ].clone();

				}

			} else {

				this.texture.length = count;

			}

		}

		return this;

	}

}

WebGLMultiRenderTarget.prototype.isWebGLMultiRenderTarget = true;

export { WebGLMultiRenderTarget };
