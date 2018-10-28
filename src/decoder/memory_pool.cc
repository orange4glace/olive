#include "decoder/memory_pool.h"

#include "logger/logger.h"

namespace olive {

void* MemoryPool::Allocate(size_t byte) {
  std::unique_lock<std::mutex> lock(m_);
  void* memory;
  auto& vec = pool_[byte];
  if (vec.size()) {
    uintptr_t addr = vec.back();
    vec.pop_back();
    memory = reinterpret_cast<void*>(addr);
    logger::get()->info("[MemoryPool] Allocate {} from pool, remains : {}", byte, vec.size());
  }
  else {
    lock.unlock();
    memory = (void*)(new uint8_t[byte]);
    logger::get()->warn("[MemoryPool] Allocate {} from malloc", byte);
  }
  return memory;
}

void MemoryPool::Free(uintptr_t ptr, size_t byte) {
  std::unique_lock<std::mutex> lock(m_);
  pool_[byte].push_back(ptr);
}

void MemoryPool::Free(void* ptr, size_t byte) {
  uint64_t data_addr = reinterpret_cast<uint64_t>(ptr);
  MemoryPool::Free(data_addr, byte);
}

std::mutex MemoryPool::m_;
std::map<size_t, std::vector<uintptr_t> > MemoryPool::pool_;

}