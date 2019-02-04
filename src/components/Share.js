import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from 'react-share';

import { faFacebookF, faTwitter, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const Share = ({ socialConfig, tags }) => {
	const tagList = tags.map(name => name.name);
	return(
	<div className="post-social">
		<FacebookShareButton
			url={socialConfig.config.url}
			className="button is-outlined is-rounded facebook"
		>
			<span className="icon">
			<FontAwesomeIcon icon={faFacebookF} />
			</span>
			<span className="text">Facebook</span>
		</FacebookShareButton>
		<TwitterShareButton
			className="button is-outlined is-rounded twitter"
			title={socialConfig.config.title}
			url={socialConfig.config.url}
			via={socialConfig.twitterHandle.split('@').join('')}
			hashtags={tagList}
		>
			<span className="icon">
				<FontAwesomeIcon icon={faTwitter} />
			</span>
			<span className="text">Twitter</span>
		</TwitterShareButton>
		<GooglePlusShareButton
			url={socialConfig.config.url}
			title={socialConfig.config.title}
			className="button is-outlined is-rounded googleplus"
		>
			<span className="icon">
				<FontAwesomeIcon icon={faGooglePlusG} />
			</span>
			<span className="text">Google+</span>
		</GooglePlusShareButton>
		<LinkedinShareButton
			url={socialConfig.config.url}
			className="button is-outlined is-rounded linkedin"
			title={socialConfig.config.title}
		>
			<span className="icon">
				<FontAwesomeIcon icon={faLinkedinIn} />
			</span>
			<span className="text">LinkedIn</span>
		</LinkedinShareButton>
	</div>
	)
};

Share.propTypes = {
	socialConfig: PropTypes.shape({
		twitterHandle: PropTypes.string.isRequired,
		config: PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	}).isRequired,
	// tags: PropTypes.arrayOf(PropTypes.string),
	// tags: PropTypes.array,
};
// Share.defaultProps = {
// 	tags: [],
// };

export default Share;