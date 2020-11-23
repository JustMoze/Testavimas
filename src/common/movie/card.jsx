import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7)), linear-gradient(to bottom, transparent 0%, black 250%),
    url(${props => props.bgPhoto});
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-position: center center;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  margin-top: 40px;
`;

const ContentColumn = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  display: block;
  margin-bottom: 8px;
  color: ${props => props.color};
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${props => props.color};
`;

const TagContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => props.tagBg};
  color: ${props => props.tagColor};
  font-size: 12px;
  font-weight: 500;
  width: 80px !important;
  text-transform: uppercase;
  padding: 3px;
  width: 60px;
  border-radius: 3px;
  text-align: center;
  color: white;
`;

const IconContainer = styled.div`
  cursor: pointer;
  color: ${props => props.color};
`;

const Card = ({
  id,
  title,
  subtitle,
  titleColor = "white",
  subtitleColor = "#595959",
  tag,
  tagBg = "#E33C36",
  tagColor = "white",
  bottomIconName,
  bottomIconSize = 2,
  bottomIconColor = "#e50914",
  centerIconName,
  removeIconName,
  centerIconSize = 3,
  centerIconColor = "white",
  bgPhoto,
  onClick,
  onClickRemove
}) => (
  <Container bgPhoto={bgPhoto}>
    {tag && (
      <TagContainer tagBg={tagBg} tagColor={tagColor}>
        <div>{tag}</div>
      </TagContainer>
    )}
    {removeIconName && <IconContainer color={bottomIconColor} style={{position: 'absolute', top: '5%', left: '5%'}}>
        <i className={`fas fa-times fa-1x`} onClick={() => onClickRemove(id)} />
      </IconContainer>}
    {centerIconName && (
      <IconContainer onClick={() => onClick(id)} color={centerIconColor} style={{position: 'absolute', top: '45%'}}>
        <i className={`${centerIconName} fa-${centerIconSize}x`} />
      </IconContainer>
    )}
    {(title || subtitle) && (
      <Content>
        <ContentColumn>
          {title && <Title color={titleColor}>{title}</Title>}
          {subtitle && <Subtitle color={subtitleColor}>{subtitle}</Subtitle>}
        </ContentColumn>
        {bottomIconName && (
          <IconContainer color={bottomIconColor}>
            <i className={`${bottomIconName} fa-${bottomIconSize}x`} />
          </IconContainer>
        )}
      </Content>
    )}
  </Container>
);

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tag: PropTypes.string,
  tagBg: PropTypes.string,
  bottomIconName: PropTypes.string,
  bottomIconSize: PropTypes.number,
  centerIconName: PropTypes.string,
  centerIconSize: PropTypes.number,
  bottomIconColor: PropTypes.string,
  centerIconColor: PropTypes.string,
  bgPhoto: PropTypes.string
};

export default Card;