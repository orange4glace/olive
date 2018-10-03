#ifndef OLIVE_MEMORY_POOL_H_
#define OLIVE_MEMORY_POOL_H_

namespace olive {

class MemoryPool {

  static void** Allocate(size_t byte);

}

} //namespace olive

#endif // OLIVE_MEMORY_POOL_H_