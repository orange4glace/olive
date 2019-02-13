#ifndef OLIVE_DECODER_H_
#define OLIVE_DECODER_H_

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

extern "C" {
#include <libavutil/imgutils.h>
#include <libavutil/samplefmt.h>
#include <libavutil/timestamp.h>
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
}

#include <mutex>
#include <condition_variable>
#include <thread>
#include <deque>

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);
#define AV_RETURN(COND, RETURN) if (!(COND)) return (RETURN);

namespace olive {

class DecoderHost;

class VideoResource;

class Decoder {

public:
  inline Decoder() {};

};

}

#endif // OLIVE_DECODER_H_