module CrystalHelper
  EPOCH = Time.at(ENV['EPOCH'].to_i)
  BIT_SHIFT = 12
  INCREMENT_PERIOD = 1 << 12 # = 2^12 = 4096

  def generate_crystal(increment)
    # get current time (ms)
    time = get_time()

    # shift it to make space for increment
    time = time << BIT_SHIFT

    # add increment to prevent collision of ids made in the same millisecond
    return time + (increment % INCREMENT_PERIOD)

    # the result is a sortable "crystal ID" that can be publicly exposed
    # without revealing information about the app's volume of usage!
  end

  private

  def get_time
    # number of milliseconds since EPOCH
    seconds = (Time.now - EPOCH).to_f
    return (seconds * 1000.0).to_i
  end
end
