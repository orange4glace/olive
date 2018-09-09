#ifndef OLIVE_MEDIA_MANANGER_H_
#define OLIVE_MEDIA_MANANGER_H_

#include "media/type_inc.h"

namespace olive {

class OLIVE_MEDIA_H_;

class MediaManager {
public:
  void LoadMedia(std::string resource_path);

private:
  std::map<media_id, Media> resources_;

}; // class MediaManager

} // namespace olive

#ifndef // OLIVE_MEDIA_MANANGER_H_